package com.zj.blog.mapper;

import com.zj.blog.pojo.Comment;

import java.util.List;
import java.util.Map;

public interface CommentMapper {
	void insertComment(Comment comment);

	List<Map<String,Object>> selectComments(Map<String,Object> map);

	Integer selectAllCommentsNum(String bid);
}
