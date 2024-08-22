<?php

namespace App\Http\Services;

use App\Models\ExperienceCategory;

class ExperienceService {

    public function getAvailableCategories(){
      return ExperienceCategory::get();
    }
    
}

