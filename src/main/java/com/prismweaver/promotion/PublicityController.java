package com.prismweaver.promotion;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/publicity")
public class PublicityController {
    @RequestMapping(value="")
    public String publicity() { return "promotion/publicity"; }
}
