package com.zj.blog.mapper;

import com.zj.blog.pojo.Category;

import java.util.List;

public interface CategoryMapper {
	List<Category> selectAllCategory();

	void addActegory(Category category);

	void updateCategory(Category category);
}
