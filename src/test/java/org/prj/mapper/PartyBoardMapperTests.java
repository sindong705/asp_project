package org.prj.mapper;

import java.util.List;

import org.prj.mapper.PartyBoardMapperTests;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.prj.domain.PartyBoardVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import lombok.extern.log4j.Log4j;

@Log4j
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
public class PartyBoardMapperTests {
	@Autowired
	private PartyBoardMapper mapper;
	
	/*
	 * @Test public void testGetList() { List<PartyBoardVO> list =
	 * mapper.getListbycategory(10);
	 * 
	 * for(PartyBoardVO vo : list) log.info(vo); }
	 */
}
