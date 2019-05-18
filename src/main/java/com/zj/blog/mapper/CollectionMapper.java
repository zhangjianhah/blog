package com.zj.blog.mapper;


import com.zj.blog.pojo.Star;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface CollectionMapper {

	void insetCollection(Star star);

	String selctCollectByUidAndBid(@Param("uid") String uid,@Param("bid") String bid);

	Integer updateCollection(@Param("uid") String uid,@Param("bid") String bid,@Param("delflg") String delflg);

	List<Map<String,Object>> selectCollectionByUname(Map<String,Object> param);

	Integer selectAllCollectionNumByUname(String uname);

	Integer updateCollectionBycid(String cid);
}
