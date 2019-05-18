package com.zj.blog.controller;


import com.zj.blog.myutils.NormalUtil;
import com.zj.blog.pojo.Comment;
import com.zj.blog.service.BlogService;
import com.zj.blog.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class CommentController {
	@Autowired
	private CommentService commentService;
	@Autowired
	private BlogService blogService;


	@PostMapping(value = "/comments")
	@ResponseBody
	public Map<String,Object> insertComment(HttpServletRequest request){
		Map<String,Object> result = new HashMap<String,Object>();
		String cvalue = request.getParameter("cvalue");
		String toblogid = request.getParameter("toblogid");
		String createuid = request.getParameter("createuid");

		Comment comment = new Comment();
		comment.setCid(NormalUtil.getUUId());
		comment.setCreatetime(NormalUtil.getCurrentDate());
		comment.setCreateuid(createuid);
		comment.setCvalue(cvalue);
		comment.setDelflg("00");
		comment.setToblogid(toblogid);

		commentService.insertComment(comment);

		blogService.addBlogCommentNum(toblogid);

		return null;
	}


	@GetMapping(value = "/comments/{bid}")
	@ResponseBody
	public Map<String,Object> selectComment(@PathVariable("bid") String bid,HttpServletRequest request){
		Map<String,Object> result = new HashMap<String,Object>();
		String offset = request.getParameter("offset");
		String size = request.getParameter("size");
		Map<String,Object> param = new HashMap<String,Object>();
		param.put("toblogid",bid);
		param.put("offset",Integer.valueOf(offset));
		param.put("size",Integer.valueOf(size));
		List<Map<String,Object>> list = commentService.selectComments(param);
		result.put("data",list);
		return result;
	}

	@GetMapping(value = "/comments/{bid}/count")
	@ResponseBody
	public Map<String,Object> selectAllCommentNum(@PathVariable("bid") String bid){
		Map<String,Object> result = new HashMap<String,Object>();
		Map<String,Object> param = new HashMap<String,Object>();
		param.put("toblogid",bid);
		Integer count = commentService.selectAllCommentsNum(bid);
		result.put("count",count);
		return result;
	}


}
