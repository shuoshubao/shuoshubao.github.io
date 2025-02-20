/* eslint-disable */

// code from https://github.com/waylonflinn/markdown-it-katex/blob/master/index.js

import KaTeX from 'katex';

const isValidDelim = (state, pos) => {
    const max = state.posMax;
    let canOpen = true;
    let canClose = true;

    const prevChar = pos > 0 ? state.src.charCodeAt(pos - 1) : -1;
    const nextChar = pos + 1 <= max ? state.src.charCodeAt(pos + 1) : -1;

    if (prevChar === 0x20 || prevChar === 0x09 || (nextChar >= 0x30 && nextChar <= 0x39)) {
        canClose = false;
    }
    if (nextChar === 0x20 || nextChar === 0x09) {
        canOpen = false;
    }

    return {
        canOpen,
        canClose
    };
};

const mathInline = (state, silent) => {
    let match;
    let token;
    let res;
    let pos;

    if (state.src[state.pos] !== '$') {
        return false;
    }

    res = isValidDelim(state, state.pos);
    if (!res.canOpen) {
        if (!silent) {
            state.pending += '$';
        }
        state.pos += 1;
        return true;
    }

    const start = state.pos + 1;
    match = start;
    while ((match = state.src.indexOf('$', match)) !== -1) {
        pos = match - 1;
        while (state.src[pos] === '\\') {
            pos -= 1;
        }

        if ((match - pos) % 2 === 1) {
            break;
        }
        match += 1;
    }

    if (match === -1) {
        if (!silent) {
            state.pending += '$';
        }
        state.pos = start;
        return true;
    }

    if (match - start === 0) {
        if (!silent) {
            state.pending += '$$';
        }
        state.pos = start + 1;
        return true;
    }

    res = isValidDelim(state, match);
    if (!res.canClose) {
        if (!silent) {
            state.pending += '$';
        }
        state.pos = start;
        return true;
    }

    if (!silent) {
        token = state.push('math_inline', 'math', 0);
        token.markup = '$';
        token.content = state.src.slice(start, match);
    }

    state.pos = match + 1;
    return true;
};

const mathBlock = (state, start, end, silent) => {
    let firstLine;
    let lastLine;
    let next;
    let lastPos;
    let found = false;
    let token;
    let pos = state.bMarks[start] + state.tShift[start];
    let max = state.eMarks[start];

    if (pos + 2 > max) {
        return false;
    }
    if (state.src.slice(pos, pos + 2) !== '$$') {
        return false;
    }

    pos += 2;
    firstLine = state.src.slice(pos, max);

    if (silent) {
        return true;
    }
    if (firstLine.trim().slice(-2) === '$$') {
        firstLine = firstLine.trim().slice(0, -2);
        found = true;
    }

    for (next = start; !found; ) {
        next++;

        if (next >= end) {
            break;
        }

        pos = state.bMarks[next] + state.tShift[next];
        max = state.eMarks[next];

        if (pos < max && state.tShift[next] < state.blkIndent) {
            break;
        }

        if (state.src.slice(pos, max).trim().slice(-2) === '$$') {
            lastPos = state.src.slice(0, max).lastIndexOf('$$');
            lastLine = state.src.slice(pos, lastPos);
            found = true;
        }
    }

    state.line = next + 1;

    token = state.push('math_block', 'math', 0);
    token.block = true;
    token.content =
        (firstLine && firstLine.trim() ? `${firstLine}\n` : '') +
        state.getLines(start + 1, next, state.tShift[start], true) +
        (lastLine && lastLine.trim() ? lastLine : '');
    token.map = [start, state.line];
    token.markup = '$$';
    return true;
};

export default (md, options = {}) => {
    const katexInline = latex => {
        options.displayMode = false;
        try {
            return KaTeX.renderToString(latex, options);
        } catch (error) {
            if (options.throwOnError) {
                console.log(error);
            }
            return latex;
        }
    };

    const inlineRenderer = (tokens, idx) => {
        return katexInline(tokens[idx].content);
    };

    const katexBlock = latex => {
        options.displayMode = true;
        try {
            return `<div>${KaTeX.renderToString(latex, options)}</div>`;
        } catch (error) {
            if (options.throwOnError) {
                console.log(error);
            }
            return latex;
        }
    };

    const blockRenderer = (tokens, idx) => {
        return `${katexBlock(tokens[idx].content)}\n`;
    };

    md.inline.ruler.after('escape', 'math_inline', mathInline);
    md.block.ruler.after('blockquote', 'math_block', mathBlock, {
        alt: ['paragraph', 'reference', 'blockquote', 'list']
    });
    md.renderer.rules.math_inline = inlineRenderer;
    md.renderer.rules.math_block = blockRenderer;
};
