package com.prismweaver.recruitment;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/recruitment")
public class Recruitment {
    @RequestMapping(value="")
    public String roadmap() { return "recrutment/recruitment"; }
}
