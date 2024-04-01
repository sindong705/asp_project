package org.prj.controller;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.prj.domain.Criteria;
import org.prj.domain.FileInfoVO;
import org.prj.domain.InquiryVO;
import org.prj.domain.PageDTO;
import org.prj.service.InquiryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import lombok.extern.log4j.Log4j;

@Log4j
@Controller
public class UploadController {
	
	// 파일 업로드 비동기 방식 -------------
	@GetMapping("/uploadAsync")
	public String uploadAsync() {
		log.info("upload Async");
		return "uploadAsync";
	}
	
	// 업로드 하는 것이라 자체적으로는 뭐를 할 필요가 없다. // uploadForm.jsp의 form action 부분이 여기다.
	@ResponseBody
	@PostMapping(value = "/uploadAsyncAction",  
	produces = {
			MediaType.APPLICATION_JSON_UTF8_VALUE,
			MediaType.APPLICATION_XML_VALUE
		})
	public ResponseEntity<List<FileInfoVO>> uploadAsyncPost(MultipartFile[] uploadFile, Model model) {
		
		List<FileInfoVO> list = new ArrayList<FileInfoVO>();
		
		log.info("upload async post...");
		
		// 폴더를 만든다.------------
		File uploadPath = new File("c:\\upload", getFolder());
		log.info("uploadPath : " + uploadPath);
		if(!uploadPath.exists()) {
			uploadPath.mkdirs();				// mkdir() 지정한 경로에 폴더가 있어야지만 새로운 폴더 생성
		}
		
		for(MultipartFile file : uploadFile) {
			
			// 객체 생성
			FileInfoVO fileVO = new FileInfoVO();
			
			log.info("------------------");
			log.info("Upload File Name : " + file.getOriginalFilename());
			log.info("Upload File Size : " + file.getSize());
			
			String uploadFileName = file.getOriginalFilename();
			
			uploadFileName = uploadFileName.substring(uploadFileName.lastIndexOf("\\") + 1);
			log.info("only file name : " + uploadFileName);
			
			UUID uuid = UUID.randomUUID();
			uploadFileName = uuid.toString() + "_" + uploadFileName;
			log.info("uuid : " + uuid);
					
			try {
				
				// 기존 파일이 이미 존재하면 삭제
				String existingFilePath = uploadPath + File.pathSeparator + uploadFileName;
				deleteFiles(existingFilePath);
				
				File saveFile = new File(uploadPath, uploadFileName); 
				file.transferTo(saveFile);
				
				fileVO.setFileName(file.getOriginalFilename());
				fileVO.setUploadPath(getFolder());
				fileVO.setUuid(uuid.toString());
				
				log.info("getFolder() : " + getFolder());
				list.add(fileVO);
				
			} catch (Exception e) {
				log.error(e.getMessage());
			}
			log.info("fileVO..." + fileVO);
			
			
		}  // end loop
		log.info("list : " + list);
		return new ResponseEntity<List<FileInfoVO>> ( list, HttpStatus.OK);
	}  // end uploadAsyncPost()
	
	// 파일 다운로드 메소드
	@GetMapping(value = "/download", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
	public ResponseEntity<Resource> downloadFile(String fileName) {
		log.info("download File..." + fileName);
		Resource resource = new FileSystemResource("c:\\upload\\" + fileName);
		
		log.info("resource : " + resource);
		
		String resourceName = resource.getFilename();
		
		HttpHeaders headers = new HttpHeaders();
		
		try {
			headers.add("Content-Disposion",
					"attach; fileName=" + new String(resourceName.getBytes("utf-8"),
					"ISO-8859-1"));
		} catch(UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		
		log.info("resource : " + resource);
		log.info("headers : " + headers);
		return new ResponseEntity<Resource>(resource, headers, HttpStatus.OK);
	}
	
	// 파일 삭제
	@PostMapping("/deleteFile")
	@ResponseBody
	public ResponseEntity<String> deleteFile(@RequestBody String fileName) {
		log.info("deleteFile : " + fileName);
		
		File file = null;
		
		try {
			file = new File("c:\\upload\\" + URLDecoder.decode(fileName, "utf-8"));
			file.delete();
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<String> ("delete", HttpStatus.OK);
	}
	
	// 오늘 날짜의 경로를 문자열로 생성
	private String getFolder() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date date = new Date();
		String str = sdf.format(date);
		return str.replace("-", File.separator);
	}
	
	// 기존 파일을 삭제하는 메서드 추가
	private void deleteFiles(String filePath) {
		try {
			File file = new File(filePath);
			if(file.exists()) {
				file.delete();
				log.info("File delete : " + filePath);
			} else {
				log.warn("File not found : " + filePath);
			}
		} catch(Exception e) {
			log.error("Failed to delete file: " + filePath, e);
		}
	}
	
	
}
