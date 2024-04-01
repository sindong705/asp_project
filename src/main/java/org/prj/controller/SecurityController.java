package org.prj.controller;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.extern.log4j.Log4j;

@Log4j
@Controller
public class SecurityController {
	@GetMapping("/accessError")
	public String accessDenied(Authentication auth) {
		log.info("Access Denied : " + auth);
		return "/accessError";
	}
}
