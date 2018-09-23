<script>
export default {
    props: {
        categorie: {
            type: String
        },
        listData: {
            type: Object
        }
    },
    render() {
        const {categorie, listData} = this;
        let list = [];
        if (['index', ''].includes(categorie)) {
            list = Object.entries(listData).reduce((prev, [k, v]) => {
                prev.push(...v);
                return prev;
            }, []);
        } else {
            list = listData[categorie];
        }
        return (
            <el-card>
                <div slot="header">
                    <span>共</span>
                    <el-button type="text">{list.length}</el-button>
                    <span>篇文章</span>
                </div>
                {
                    list.map((v, i) => {
                        return (
                            <div>
                                <a href={`#${[categorie, v.name].join('/')}`}>
                                    <el-button type="text">{v.title}</el-button>
                                </a>
                            </div>
                        );
                    })
                }
            </el-card>
        );
    }
};
</script>
