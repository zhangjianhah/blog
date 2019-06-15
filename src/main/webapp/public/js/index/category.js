
class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chooseCategory:-1,//点击选中的种类
        };
    }
    componentDidMount() {

    }

    componentWillUnmount() {

    }

    clickCategory(index){
        this.props.clickCategory(index);
        this.setState({
            chooseCategory:index,
        })

    }

    render() {
        var that = this;
        var categoryList = that.props.categoryList;
        var chooseCategory = that.state.chooseCategory;
        return (
            <div>

                <div>
                    <div className="contents pull-left categorys" style={{width:"20%"}}>
                        <ul className="list-group">
                            <li className={chooseCategory == -1 ? 'list-group-item active' : 'list-group-item'}  onClick={()=>that.clickCategory(-1)}>
                                所有
                            </li>
                            {categoryList.map((item,index)=>{
                                return (
                                    <li className={chooseCategory == index ? 'list-group-item active' : 'list-group-item'} key={index} onClick={()=>that.clickCategory(index)}>
                                        {item.cname}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>

        );

    }
}

// ReactDOM.render(
//     <Category />,
//     document.getElementById('root')
// );