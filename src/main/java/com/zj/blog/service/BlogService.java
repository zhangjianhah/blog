package com.zj.blog.service;

import com.zj.blog.mapper.BlogMapper;
import com.zj.blog.mapper.UserMapper;
import com.zj.blog.pojo.Blog;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class BlogService {

	@Autowired
	private BlogMapper blogMapper;

	@Autowired
	private UserMapper userMapper;


	public void addBlog(Blog blog,String uname){
		String uid = userMapper.selectUidByUname(uname);
		blog.setCreateuid(uid);
		try {
			blogMapper.addBlog(blog);
		}catch (Exception e){
			e.printStackTrace();
		}

	}

	public List<Map<String,Object>> selectBlogByUid(Map<String,Object> map){

		return blogMapper.selectBlogByUid(map);
	}

	public Integer selectBlogCountByUid(String username){
		return  blogMapper.selectBlogCountByUid(username);
	}

	public Integer updateBlogByBid(Blog blog){
		return blogMapper.updateBlogByBid(blog);
	}

	public List<Map<String,Object>>selectBlogOnTourist(Map<String,Object> map){
		try {
			blogMapper.selectBlogOnTourist(map);
		}catch (Exception e){
			e.printStackTrace();
		}
		return blogMapper.selectBlogOnTourist(map);
	}

	public Integer selectBlogCountOnTourist(Map<String,Object> param){
		return blogMapper.selectBlogCountOnTourist(param);
	}

	public Map<String,Object>selectBlogAndUser(String bid){
		Map<String,Object> map = blogMapper.selectBlogAndUser(bid);
		Map<String,Object> param = blogMapper.selecetUserInfoByBlog(bid);
		map.put("userinfo",param);
		return map;
	}


	public Integer updateBlogCollectionNum(String bid,String delflg){
		return blogMapper.updateBlogCollectionNum(bid,delflg);
	}

	public Integer addBlogCommentNum(String bid){
		return blogMapper.addBlogCommentNum(bid);
	}

}
