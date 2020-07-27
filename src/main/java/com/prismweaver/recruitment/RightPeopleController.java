package com.prismweaver.recruitment;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/rightpeople")
public class RightPeopleController {
    @RequestMapping(value="")
    public String rightpeople() { return "recrutment/rightpeople"; }
}
