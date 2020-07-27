package com.prismweaver.infomation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/roadmap")
public class RoadmapController {
    @RequestMapping(value="")
    public String roadmap() { return "infomation/roadmap"; }
}
