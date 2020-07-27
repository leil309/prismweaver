package com.prismweaver.promotion;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/promotion")
public class PromotionController {
    @RequestMapping(value="")
    public String promotion() { return "promotion/promotion"; }
}
