package com.zj.blog.controller;

import com.zj.blog.myutils.NormalUtil;
import com.zj.blog.pojo.Resources;
import com.zj.blog.service.ResourcesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class ResourcesController {

	@Autowired
	private ResourcesService resourcesService;

	@PostMapping(value = "/urlresources")
	@ResponseBody
	public Map<String,Object> addResourcesMapper(HttpServletRequest request){
		Map<String,Object> result = new HashMap<String,Object>();
		String sname = request.getParameter("sname");
		Resources resources = new Resources();
		resources.setSid(NormalUtil.getUUId());
		resources.setSname(sname);
		resources.setCreatetime(NormalUtil.getCurrentDate());
		resources.setDelflg("00");

		try {
			resourcesService.insertResources(resources);
		}catch (Exception e){
			e.printStackTrace();
		}



		return result;
	}

	@GetMapping(value = "/urlresources")
	@ResponseBody
	public Map<String,Object> selectAllResource(HttpServletRequest request){
		Map<String,Object> result = new HashMap<String,Object>();


		List<Map<String,Object>> list = resourcesService.selectAllResource();
		result.put("data",list);



		return result;
	}

	@PutMapping(value = "/urlresources/{sid}")
	@ResponseBody
	public Map<String,Object> updateResource(HttpServletRequest request, @PathVariable("sid") String sid){
		Map<String,Object> result = new HashMap<String,Object>();
		String sname = request.getParameter("sname");
		Resources resources = new Resources();
		resources.setSid(sid);
		resources.setSname(sname);
		resourcesService.updateResources(resources);
		return result;
	}

	@DeleteMapping(value = "/urlresources/{sid}")
	@ResponseBody
	public Map<String,Object> deleteResource(HttpServletRequest request, @PathVariable("sid") String sid){
		Map<String,Object> result = new HashMap<String,Object>();
		Resources resources = new Resources();
		resources.setSid(sid);
		resources.setDelflg("01");
		resourcesService.updateResources(resources);
		return result;
	}

	@GetMapping(value = "/urlresources/power/{role}")
	@ResponseBody
	public Map<String,Object> selectAllResourcePower(HttpServletRequest request){
		Map<String,Object> result = new HashMap<String,Object>();


		List<Map<String,Object>> list = resourcesService.selectAllResource();
		result.put("data",list);



		return result;
	}
}
