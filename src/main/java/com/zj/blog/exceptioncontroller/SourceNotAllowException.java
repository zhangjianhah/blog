package com.zj.blog.exceptioncontroller;

public class SourceNotAllowException extends GlobalException{
	public SourceNotAllowException(String message, int code) {
		super(message, code);
	}
}
