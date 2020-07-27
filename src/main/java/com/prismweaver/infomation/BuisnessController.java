package com.prismweaver.infomation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/buisness")
public class BuisnessController {
    @RequestMapping(value="")
    public String buisness() { return "infomation/buisness"; }
}
