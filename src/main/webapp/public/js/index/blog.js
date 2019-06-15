class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chooseBlog:-1,
        };
    }
    componentDidMount() {

    }

    componentWillUnmount() {
        var that = this;

    }

    //选中加深背景颜色
    chooseLiToCahengColor(index){
        this.setState({
            chooseBlog:index
        });
    }

    render() {
        var that = this;
        var blogList = that.props.blogList;
        return (
            <div className="contents pull-left blogList" style={{width:'70%',marginLeft:'20%'}}>
                <ul className="list-group conlist">
                        {blogList && blogList.map((item,index)=>{
                            return (
                                <li className={index == that.state.chooseBlog ? "list-group-item conlist-item choose_blog_li" : "list-group-item conlist-item"} key={index} onMouseEnter={
                                    ()=>{that.chooseLiToCahengColor(index)}
                                } onMouseLeave={
                                    ()=>{that.chooseLiToCahengColor(-1)}
                                }>
                                <div className="blogitemleft">
                                    <div className="conlist-item-title">
                                        <a href="/blog/articles/0ea8cf7dae484389a6997909d43a2b16">{item.btitle}</a>
                                    </div>
                                    <div className="conlist-item-con" dangerouslySetInnerHTML={{__html: item.bcontext}}></div>
                                    <div className="conlist-item-info">
                                        <span>{item.uname}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                        <span>{item.createtime}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                        <span>阅读量</span><span>{item.clicknum}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                        <span>收藏量</span><span>{item.collectionnum}</span>
                                    </div>
                                </div>
                                <div className="blogitemright">
                                <img src={"http://localhost:8080/resources/"+item.img}/>
                                </div>
                                </li>
                            );
                        })}
                </ul>
            </div>
        );
    }
}
