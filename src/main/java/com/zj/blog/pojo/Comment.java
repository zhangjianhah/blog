package com.zj.blog.pojo;

public class Comment {
	private String cid;
	private String cvalue;
	private String toblogid;
	private String createuid;
	private String createtime;
	private String delflg;

	public String getCid() {
		return cid;
	}

	public void setCid(String cid) {
		this.cid = cid;
	}

	public String getCvalue() {
		return cvalue;
	}

	public void setCvalue(String cvalue) {
		this.cvalue = cvalue;
	}

	public String getToblogid() {
		return toblogid;
	}

	public void setToblogid(String toblogid) {
		this.toblogid = toblogid;
	}

	public String getCreateuid() {
		return createuid;
	}

	public void setCreateuid(String createuid) {
		this.createuid = createuid;
	}

	public String getCreatetime() {
		return createtime;
	}

	public void setCreatetime(String createtime) {
		this.createtime = createtime;
	}

	public String getDelflg() {
		return delflg;
	}

	public void setDelflg(String delflg) {
		this.delflg = delflg;
	}
}
