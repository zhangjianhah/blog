

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyWord:'',
            login:false
        }
    }
    componentDidMount() {
        this.checkuserstatus();
    }

    componentWillUnmount() {

    }

    changeKeyWord(event){
        this.props.changeKeyWord(event.target.value)

    }
    submitFunc(){
        this.props.submitFunc()
    }
    registerfunc(){
        window.location.href = this.props.baseUrl+"register.html";
    }
    tomanagermentfunc() {
        window.location.href = this.props.baseUrl+"managerment.html";
    }
    loginfunc() {
        window.location.href = this.props.baseUrl+"login.html";
    }
    logoutfunc() {
        $.cookie("token", null,{path:"/"});
        $.cookie("username", null,{path:"/"});
        alert("已退出");
        this.checkuserstatus();
    }

    //判断用户是否登陆
    checkuserstatus() {
        var username = $.cookie('username');
        //未登录
        if(username == null || username == "null" || username == ""){
            console.log(123)
            this.setState({
                login:false
            })
        }else {
            console.log(456)
            this.setState({
                login:true,
            })
        }
    }


    render() {
        var that = this;
        return (
            <div className="top row">
                <div className="col-lg-6">
                    <div className="input-group">
                        <input type="text" className="form-control keyword" placeholder="请输入搜索内容" onChange={(e) => that.changeKeyWord(e)}/>
                        <span className="input-group-btn">
                            <button className="btn btn-default searchbtn" type="button" onClick={()=>that.submitFunc()}>Go!</button>
                        </span>
                    </div>
                </div>

                <div className="pull-left"><input type="button" defaultValue="注册" className="register btn btn-default "
                                                  onClick={()=>that.registerfunc()}/></div>
                <div className="pull-left"><input type="button" defaultValue="登陆" className="login btn btn-default "
                                                  onClick={()=>that.loginfunc()} style={{"display":that.state.login ? "none" : ""}}/></div>
                <div className="pull-left"><input type="button" defaultValue="管理" className="logout btn btn-default "
                                                  onClick={()=>that.tomanagermentfunc()} style={{"display":that.state.login ? "" : "none"}}/></div>
            </div>
        );
    }
}
