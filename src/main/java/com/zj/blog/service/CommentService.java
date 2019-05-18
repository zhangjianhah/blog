package com.zj.blog.service;

import com.zj.blog.mapper.CommentMapper;
import com.zj.blog.pojo.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CommentService {

	@Autowired
	private CommentMapper commentMapper;

	public void insertComment(Comment comment){
		commentMapper.insertComment(comment);
	}

	public List<Map<String,Object>> selectComments(Map<String,Object> map){
		return commentMapper.selectComments(map);
	}

	public Integer selectAllCommentsNum(String bid){
		return commentMapper.selectAllCommentsNum(bid);
	}
}
