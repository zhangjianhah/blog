package com.zj.blog.exceptioncontroller;

public class Result {
	/**
	 * 错误内容
	 */
	private String error;

	/**
	 * 自定义错误码
	 */
	private int code;


	public Result(String error, int code)
	{
		this.error = error;
		this.code = code;
	}

	public String getError()
	{
		return error;
	}

	public void setError(String error)
	{
		this.error = error;
	}

	public int getCode()
	{
		return code;
	}

	public void setCode(int code)
	{
		this.code = code;
	}


	public enum ErrorCode{
		/**
		 * 用户不存在
		 */
		USER_NOT_FOUND(40401),

		/**
		 * 用户已存在
		 */
		USER_ALREADY_EXIST(40001),
		//资源格式不正确
		SOURCEFORMAT_NOT_ALLOW(40301),
		//用户尚未登陆
		USER_NOT_LOGIN(401),
		VALIDATION_ERROR(40302),
		//参数有误，资源不存在
		PARAMETER_NOT_EXIST(40002)
		;

		private int code;

		public int getCode()
		{
			return code;
		}

		ErrorCode(int code)
		{
			this.code = code;
		}
	}

}
