package com.zj.blog.service;

import com.zj.blog.mapper.CategoryMapper;
import com.zj.blog.myutils.NormalUtil;
import com.zj.blog.pojo.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
	@Autowired
	private CategoryMapper categoryMapper;

	public List<Category> selectAllCategory(){
		return categoryMapper.selectAllCategory();
	}

	public void addActegory(String cname){
		Category category = new Category();
		category.setCid(NormalUtil.getUUId());
		category.setCname(cname);
		category.setCreatetime(NormalUtil.getCurrentDate());
		category.setDelflg("00");
		try {
			categoryMapper.addActegory(category);
		}catch (Exception e){
			e.printStackTrace();
		}
	}

	public void updateCategory(Category category){
		categoryMapper.updateCategory(category);
	}

}
