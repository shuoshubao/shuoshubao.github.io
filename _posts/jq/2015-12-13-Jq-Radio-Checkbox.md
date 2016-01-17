---
layout: post
title:  "JQ - radio-checkbox"
date:   2015-12-28 00:00:01
categories: jq
permalink: jq/radio-checkbox
---



## 获取radio选中值

	$(':checked').val()

## 设置指定的radio选中

	$('[value="'+n+'"]').prop('checked', true)


## 获取checkbox选中的值

	var arr = [];
	$('input').each(function() {
		if($(this).prop('checked')) {
			arr.push($(this).val());
		}
	})

## 设置指定的checkbox选中

	$.each(arr, function(i, v) {
		$('[value="'+v+'"]').prop('checked', true);
	})
