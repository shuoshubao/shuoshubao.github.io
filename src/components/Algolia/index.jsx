import HighlightText from '@/components/HighlightText';
import { decodeText, memoizeFetch } from '@/utils';
import { SearchOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Col, Empty, Input, List, Modal, Row, Tag, Typography } from 'antd';
import { debounce, find, once } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

export default () => {
    const autoCompleteRef = useRef();
    const autoCompleteContainerRef = useRef();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [AllData, setAllData] = useState({});

    const [options, setOptions] = useState([]);

    const { t } = useTranslation();

    const searchFunc = async query => {
        const text = await memoizeFetch('store/data.json');
        const ArticleData = JSON.parse(text);
        const list = [];
        Object.entries(AllData).forEach(([k, content]) => {
            const [category, name] = atob(k).split('/');
            const { title } = find(ArticleData[category], { name });
            const ContentList = decodeText(content.toString().split(',')).split('\n');
            const filterContentList = [category, name, title, ...ContentList].filter(v2 => {
                return v2.toLowerCase().includes(query.toLowerCase());
            });
            if (!filterContentList.length) {
                return;
            }
            list.push({
                value: atob(k),
                label: (
                    <Row>
                        <Col
                            span={6}
                            style={{
                                display: 'flex',
                                alignContent: 'center',
                                flexWrap: 'wrap'
                            }}
                        >
                            {title}
                        </Col>
                        <Col span={18}>
                            <List
                                dataSource={filterContentList}
                                renderItem={item => {
                                    return (
                                        <List.Item style={{ padding: '5px 0' }}>
                                            <div>
                                                <HighlightText value={item.trim()} query={query} />
                                            </div>
                                        </List.Item>
                                    );
                                }}
                            />
                        </Col>
                    </Row>
                )
            });
        });
        setOptions(list);
    };

    const debounceSearchFunc = debounce(searchFunc, 500);

    const handleSearch = q => {
        const query = q.trim();
        if (query.length <= 1) {
            setOptions([]);
            return;
        }
        debounceSearchFunc(query);
    };

    const handleSelect = value => {
        window.location.hash = value;
        setIsModalOpen(false);
    };

    const fetchData = async () => {
        const data = await memoizeFetch('store/all.json');
        setAllData(JSON.parse(data));
    };

    const onceFetchData = once(fetchData);

    const keydownListener = e => {
        const { metaKey, key } = e;
        if (metaKey && key === 'k') {
            if (!isModalOpen) {
                setTimeout(() => {
                    autoCompleteRef?.current?.focus();
                }, 100);
            }
            setIsModalOpen(!isModalOpen);
            onceFetchData();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', keydownListener);
        return () => {
            window.removeEventListener('keydown', keydownListener);
        };
    }, [isModalOpen, setIsModalOpen]);

    return (
        <>
            <Button
                block
                onClick={() => {
                    setIsModalOpen(true);
                    onceFetchData();
                    setTimeout(() => {
                        autoCompleteRef?.current?.focus();
                    }, 100);
                }}
            >
                <SearchOutlined />
                <Text type="secondary" style={{ flex: 1, textAlign: 'left' }}>
                    {t('search')}
                </Text>
                <Tag style={{ margin: 0, marginLeft: 12 }}>⌘ K</Tag>
            </Button>
            <Modal
                open={isModalOpen}
                width="90%"
                style={{ top: 12 }}
                className="algolia-modal"
                footer={null}
                onCancel={() => {
                    setIsModalOpen(false);
                }}
                destroyOnClose
            >
                <AutoComplete
                    ref={autoCompleteRef}
                    options={options}
                    onSearch={handleSearch}
                    onSelect={handleSelect}
                    autoFocus
                    virtual={false}
                    allowClear
                    getPopupContainer={() => {
                        return autoCompleteContainerRef?.current;
                    }}
                    style={{ width: '100%' }}
                    notFoundContent={<Empty />}
                >
                    <Input size="large" prefix={<SearchOutlined />} />
                </AutoComplete>
                <div ref={autoCompleteContainerRef} className="algolia-container" />
            </Modal>
        </>
    );
};
