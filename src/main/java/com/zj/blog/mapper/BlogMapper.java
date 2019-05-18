package com.zj.blog.mapper;

import com.zj.blog.pojo.Blog;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface BlogMapper {
	Integer addBlog(Blog blog);

	List<Map<String,Object>>selectBlogByUid(Map<String,Object> map);

	Integer selectBlogCountByUid(String uid);

	Integer updateBlogByBid(Blog blog);

	List<Map<String,Object>>selectBlogOnTourist(Map<String,Object> map);

	Integer selectBlogCountOnTourist(Map<String,Object> param);

	Map<String,Object>selectBlogAndUser(String bid);

	Integer updateBlogCollectionNum(@Param("bid") String bid,@Param("delflg")String delflg);

	Map<String,Object> selecetUserInfoByBlog(String bid);

	Integer addBlogCommentNum(String bid);



}
