

class Stage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chooseCategory:-1,//点击选中的种类
            categoryList:[],//种类列表
            blogList:[],
            keyWord:'',
            baseUrl:window.location.origin + "/" + window.location.pathname.split('/')[1] + '/',
            offset:0,//排除前面条数
            size:10,//每次显示条数
            atLast:false,//是否已经获取所有数据了
            currentCategory:'',
        };

    }
    componentDidMount() {
        this.getCategoryList(this.state.baseUrl);
        this.getmyblog(-1);

        var that = this;
        //增加监听事件
        document.addEventListener('scroll', ()=>that.trackScrolling(that));
        this.getCategoryList(this.state.baseUrl);
        this.getmyblog(this.state.baseUrl,-1);

    }

    componentWillUnmount() {
        var that = this;
        //移除监听事件
        document.removeEventListener('scroll', ()=>that.trackScrolling(that));
    }
    //获取所有种类
    getCategoryList(basepath) {
        var that = this;
        $.ajax({
            url:basepath+"categorys",
            type:"get",
            dataType:"json",
            async:false,
            success:function(data){
                that.setState({
                    categoryList:data.category
                })
            },
            error:function(){

            }
        });
    }

    clickCategory(index){
        let categoryid = index == -1 ? '' : this.state.categoryList[index].cid;
        this.setState({
            currentCategory:categoryid
        })
        this.getmyblog();

    }
    //获取博客（分页）
    getmyblog(){
        var that = this;
        $.ajax({
            url:that.state.baseUrl+"blogs/total",
            data:{
                "offset":that.state.offset,
                "size":that.state.size,
                "keyword":that.state.keyWord,
                "categoryid":that.state.currentCategory
            },
            type:"GET",
            success:function (data) {
                var arr = that.state.blogList;
                var arra = data["data"];
                if(that.state.offset  == 0){
                    that.state.blogList = arra
                }else{
                    that.state.blogList = arr.concat(arra)
                }

                if(arra.length == 0){
                    that.state.atLast = true;
                }
                that.forceUpdate();
            },
            error:function () {

            }
        });

    }
    changeKeyWord(keyword){
        this.setState({
            keyWord:keyword
        });
    }
    submitFunc(){
        console.log(1)
        this.getmyblog()
    }

    //网页被卷曲的高度
    getDocumentTop() {
        var scrollTop = 0,
            bodyScrollTop = 0,
            documentScrollTop = 0;
        if (document.body) {
            bodyScrollTop = document.body.scrollTop;
        }
        if (document.documentElement) {
            documentScrollTop = document.documentElement.scrollTop;
        }
        scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
        return scrollTop;
    }
    //可视窗口高度
    getWindowHeight() {
        var windowHeight = 0;
        if (document.compatMode == "CSS1Compat") {
            windowHeight = document.documentElement.clientHeight;
        } else {
            windowHeight = document.body.clientHeight;
        }
        return windowHeight;
    }

    //滚动条滚动高度
    getScrollHeight() {
        var scrollHeight = 0,
            bodyScrollHeight = 0,
            documentScrollHeight = 0;
        if (document.body) {
            bodyScrollHeight = document.body.scrollHeight;
        }
        if (document.documentElement) {
            documentScrollHeight = document.documentElement.scrollHeight;
        }
        scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
        return scrollHeight;
    }


    trackScrolling(that){
        if(that.getScrollHeight() == that.getWindowHeight() + that.getDocumentTop() && !that.state.atLast){
            var offset = this.state.offset += 10;
            this.setState({
                offset:offset
            })
            this.getmyblog(this.state.baseUrl,-1);
        }
    }




    render() {
        let that = this;
        return (
            <div>
                <Search
                    submitFunc = {() => that.submitFunc()}
                    baseUrl = {this.state.baseUrl}
                    changeKeyWord={keyWord => that.changeKeyWord(keyWord)}/>
                <Category categoryList = {this.state.categoryList}
                          clickCategory = {index => this.clickCategory(index)}
                />
                <Blog blogList={that.state.blogList} />
            </div>
        );

    }
}

ReactDOM.render(
    <Stage />,
    document.getElementById('root')
);