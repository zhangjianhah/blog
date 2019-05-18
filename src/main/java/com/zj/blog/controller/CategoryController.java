package com.zj.blog.controller;

import com.zj.blog.pojo.Category;
import com.zj.blog.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "/categorys")
public class CategoryController {

	@Autowired
	private CategoryService categoryService;

	@GetMapping(value = "")
	@ResponseBody
	public Map<String,Object> selectAllCategory(){
		Map<String,Object> result = new HashMap<String,Object>();
		List<Category> list = categoryService.selectAllCategory();
		result.put("category",list);

		return result;
	}

	@PostMapping(value = "")
	@ResponseBody
	public String addCategory(HttpServletRequest request){
		String cname = request.getParameter("cname");
		categoryService.addActegory(cname);

		return "OK";
	}

	@PutMapping(value = "/{cid}")
	@ResponseBody
	public Map<String,Object> updateCategory(@PathVariable("cid")String cid,
											 HttpServletRequest request){
		Map<String,Object> result = new HashMap<String,Object>();
		String cname = request.getParameter("cname");
		Category category = new Category();
		category.setCid(cid);
		category.setCname(cname);
		categoryService.updateCategory(category);
		return  result;
	}

	@DeleteMapping(value = "/{cid}")
	@ResponseBody
	public Map<String,Object> deleteCategory(@PathVariable("cid")String cid){
		Map<String,Object> result = new HashMap<String,Object>();
		Category category = new Category();
		category.setCid(cid);
		category.setDelflg("01");
		categoryService.updateCategory(category);
		return  result;
	}
}
