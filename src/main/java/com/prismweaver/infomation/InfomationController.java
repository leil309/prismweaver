package com.prismweaver.infomation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/infomation")
public class InfomationController {
    @RequestMapping(value="")
    public String infomation() { return "infomation/infomation"; }
}
