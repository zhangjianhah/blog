package com.zj.blog.service;

import com.zj.blog.mapper.CollectionMapper;
import com.zj.blog.myutils.NormalUtil;
import com.zj.blog.pojo.Star;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CollectionService {

	@Autowired
	private CollectionMapper collectionMapper;

	public void insetCollection(Star star){
		collectionMapper.insetCollection(star);
	}


	public String selctCollectByUidAndBid(String uid,String bid){
		return collectionMapper.selctCollectByUidAndBid(uid,bid);
	}

	public void updateCollection(String uid,String bid,String delflg){

		Integer result =  collectionMapper.updateCollection(uid,bid,delflg);
		if(result != null && result != 0){
			//成功
		}else{
			Star star = new Star();
			star.setCid(NormalUtil.getUUId());
			star.setBid(bid);
			star.setUid(uid);
			star.setCreatetime(NormalUtil.getCurrentDate());
			star.setDelflg(delflg);
			collectionMapper.insetCollection(star);
		}
	}

	public List<Map<String,Object>> selectCollectionByUname(Map<String,Object> param){
		return collectionMapper.selectCollectionByUname(param);
	}

	public Integer selectAllCollectionNumByUname(String uname){
		return collectionMapper.selectAllCollectionNumByUname(uname);
	}


	public Integer updateCollectionBycid(String cid){
		return collectionMapper.updateCollectionBycid(cid);
	}
}
