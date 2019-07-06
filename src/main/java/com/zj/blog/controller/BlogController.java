package com.zj.blog.controller;

import com.zj.blog.exceptioncontroller.Result;
import com.zj.blog.exceptioncontroller.SourceNotAllowException;
import com.zj.blog.myutils.*;
import com.zj.blog.pojo.Blog;
import com.zj.blog.service.BlogService;
import com.zj.blog.service.CollectionService;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class BlogController {

	@Autowired
	private BlogService blogService;
	@Autowired
	private CollectionService collectionService;

	/**
	 * 上传博客
	 * @param request
	 * @return
	 */
	@PostMapping("/blogs")
	@ResponseBody
	public Map<String,Object> insetNewBlog(HttpServletRequest request){
		Map<String,Object> result = new HashMap<String,Object>();
		String title = request.getParameter("blogtitle");
		String category = request.getParameter("blogcategory");
		String content = request.getParameter("blogcontent");
		String username = request.getParameter("username");
		Blog blog = new Blog();
		blog.setBid(NormalUtil.getUUId());
		blog.setBtitle(title);
		blog.setCategory(category);
		blog.setBcontext(content);
		blog.setCreatetime(NormalUtil.getCurrentDate());

		blogService.addBlog(blog,username);


		return result;
	}


	/**
	 *
	 * @param request
	 * @param img  图片
	 * @return
	 * @throws SourceNotAllowException
	 */
	@PostMapping(value = "/blogs/images")
	@ResponseBody
	public Map<String,Object> uploadImage(HttpServletRequest request,MultipartFile img) throws SourceNotAllowException {
		Map<String,Object> result = new HashMap<String,Object>();
		String getToken = "";
		Cookie[] cookies = request.getCookies();
		for(Cookie cookie : cookies){
			if(cookie.getName().equals("token")){
				getToken = cookie.getValue();
				break;
			}
		}
		Subscriber subscriber = Jutil.unsignToken(getToken,Subscriber.class);
		String uid = subscriber.getId();

		if(img != null && img.getSize() != 0){

			String name = img.getOriginalFilename();
			String ext = FilenameUtils.getExtension(name);
			if(!Arrays.asList(NormalUtil.imageFormats).contains(ext)){
				throw new SourceNotAllowException("上传的图片资源格式不符合规范",Result.ErrorCode.SOURCEFORMAT_NOT_ALLOW.getCode());
			}
			String fileName = NormalUtil.getFilename()+"."+ext;
			String parentPath = NormalUtil.imagePosition+"/"+uid;
			try {
				Files.createDirectories(Paths.get(parentPath));
				img.transferTo(new File(parentPath+"/"+fileName));
			} catch (IOException e) {
				e.printStackTrace();
			}

			String imagedir =
					NormalUtil.imagePosition.substring(
							NormalUtil.imagePosition.lastIndexOf('/'),
							NormalUtil.imagePosition.length());
			String url = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
					+"/resources"+imagedir+"/"+uid+"/"+fileName;


			String[] arr = {url};
			result.put("errno","0");
			result.put("data",arr);

		}



		return result;
	}

	/**
	 * 根据用户的id获取其所有文章
	 *
	 */
	@GetMapping(value = "/blogs/users/{username}")
	@ResponseBody
	public Map<String,Object> getAllblogByUid(HttpServletRequest request,@PathVariable("username")String username){
		Map<String,Object> result = new HashMap<String,Object>();
		String offset = request.getParameter("offset");
		String size = request.getParameter("size");
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("username",username);
		map.put("offset",Integer.valueOf(offset));
		map.put("size",Integer.valueOf(size));
		List<Map<String,Object>> data = blogService.selectBlogByUid(map);
		result.put("data",data);



		return result;
	}

	/**
	 * 获取固定用户的博客数量
	 *
	 * @param request
	 * @return
	 */
	@GetMapping(value = "/blogs/count")
	@ResponseBody
	public Map<String,Object> getAllblogNumByUid(HttpServletRequest request){
		Map<String,Object> result = new HashMap<String,Object>();
		String username = request.getParameter("username");

		Integer count = blogService.selectBlogCountByUid(username);
		result.put("count",count);


		return result;
	}

	/**
	 * 修改博客
	 * @param request
	 * @param bid
	 * @return
	 */
	@PutMapping(value = "/blogs/{bid}")
	@ResponseBody
	public Map<String,Object> updateBlog(HttpServletRequest request,@PathVariable("bid")String bid){
		Map<String,Object> result = new HashMap<String,Object>();
		String title = request.getParameter("blogtitle");
		String category = request.getParameter("blogcategory");
		String content = request.getParameter("blogcontent");
		String uid = request.getParameter("uid");
		String visibility = request.getParameter("visibility");

		Blog blog = new Blog();
		//visibility存在，那么就是修改隐藏性，否则修改其他项
		if(visibility != null && !"".equals(visibility)){
			if("00".equals(visibility)){
				visibility = "01";
			}else {
				visibility = "00";
			}
			blog.setVisible(visibility);
		}else {
			blog.setBtitle(title);
			blog.setCategory(category);
			blog.setBcontext(content);
			blog.setCreateuid(uid);

		}
		blog.setBid(bid);
		blog.setUpdatetime(NormalUtil.getCurrentDate());

		blogService.updateBlogByBid(blog);

		return result;
	}

	/**
	 * 点击量
	 * @param request
	 * @param bid
	 * @return
	 */
	@PutMapping(value = "/blogs/{bid}/clicknum")
	@ResponseBody
	public Map<String,Object> updateBlogClickNum(HttpServletRequest request,@PathVariable("bid")String bid){
		Map<String,Object> result = new HashMap<String,Object>();
		String clicknum = request.getParameter("clicknum");


		Blog blog = new Blog();
		blog.setBid(bid);
		if(clicknum != null && !"".equals(clicknum)){
			blog.setClicknum(Integer.valueOf(clicknum));
		}
		blogService.updateBlogByBid(blog);

		return result;
	}

	/**
	 * 删除博客
	 * @param id
	 */
	@DeleteMapping(value = "/blogs/{id}")
	@ResponseBody
	public void deleteBlog(@PathVariable("id")String id){
		Map<String,Object> result = new HashMap<String,Object>();

		Blog blog = new Blog();
		blog.setBid(id);
		blog.setDelflg("01");
		blogService.updateBlogByBid(blog);
	}

	/**
	 * 游客模式下，获取所有人的刻度文章
	 * @return
	 */
	@GetMapping(value = "/blogs/total")
	@ResponseBody
	public Map<String,Object> getAllBlog(HttpServletRequest request){
		Map<String,Object> result = new HashMap<String,Object>();
		String offset = request.getParameter("offset");
		String size = request.getParameter("size");
		String keyword = request.getParameter("keyword");
		String categoryid = request.getParameter("categoryid");
		Map<String,Object> param = new HashMap<String,Object>();
		param.put("offset",Integer.valueOf(offset));
		param.put("size",Integer.valueOf(size));
		param.put("keyword",keyword);
		param.put("categoryid",categoryid);
		List<Map<String ,Object>> list = blogService.selectBlogOnTourist(param);
		result.put("data",list);


		return result;
	}


	@GetMapping(value = "/blogs/total/count")
	@ResponseBody
	public Map<String,Object> getAllBlogNum(HttpServletRequest request){
		Map<String,Object> result = new HashMap<String,Object>();
		String keyword = request.getParameter("keyword");
		String categoryid = request.getParameter("categoryid");
		Map<String,Object> param = new HashMap<String,Object>();
		param.put("keyword",keyword);
		param.put("categoryid",categoryid);
		Integer count = blogService.selectBlogCountOnTourist(param);
		result.put("count",count);
		return result;
	}

	/**
	 * 获取单个文章
	 * @param bid
	 * @return
	 */
	@GetMapping(value = "/blogs/{bid}")
	@ResponseBody
	public Map<String,Object> getBlogByBid(@PathVariable("bid") String bid,HttpServletRequest request){
		Map<String,Object> result = new HashMap<String,Object>();
		String getToken = "";
		Subscriber subscriber = null;//jwt中内容
		Cookie[] cookies = request.getCookies();
		if(cookies != null){
			for(Cookie cookie : cookies){
				if(cookie.getName().equals("token")){
					getToken = cookie.getValue();
				}
			}
		}
		if("".equals(getToken)){
			result.put("collection",false);
		}else{
			//subscriber = JWTUtil.unsignToken(getToken,Subscriber.class);
			subscriber = Jutil.unsignToken(getToken,Subscriber.class);
			String uid = subscriber.getId();
			String getCollection = collectionService.selctCollectByUidAndBid(uid,bid);
			if(getCollection != null){
				//不为空，则该文章已经被该用户收藏
				result.put("collection",true);
			}else {
				result.put("collection",false);
			}
		}


		Map<String,Object> map = blogService.selectBlogAndUser(bid);
		result.put("data",map);
		return result;
	}

	@GetMapping(value = "/identifyingcode")
	@ResponseBody
	public void validateCode(HttpServletRequest request, HttpServletResponse response) throws Exception{
		System.out.println("验证码进来了");
		//第一个参数是生成的验证码，第二个参数是生成的图片  objs[0]  objs[1]
		Object[] objs = ImageUtil.createImage();
		//将验证码存入Session
		//request.getSession(true).setAttribute("validateCode",objs[0]);
		Cookie cookie = new Cookie("identifyingcode",EncrypterUtil.getMD5(objs[0].toString().toLowerCase()));
		cookie.setPath("/");
		cookie.setMaxAge(60*1);//cookie保存1分钟
		response.addCookie(cookie);
		System.out.println("增加了cookie");
		System.out.println("验证码是："+objs[0].toString());
		//将图片输出给浏览器
		BufferedImage image = (BufferedImage) objs[1];
		// 禁止图像缓存。
		response.setHeader("Pragma", "no-cache");
		response.setHeader("Cache-Control", "no-cache");
		response.setDateHeader("Expires", 0);
		response.setContentType("image/jpeg");
		OutputStream os = response.getOutputStream();
		ImageIO.write(image, "jpeg", os);
		os.flush();
	}
}
