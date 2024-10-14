<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    use HasFactory;
     /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'description',
        'title',
        'imageUrl',
        'categoryId',
        'isVisible',
        'micrositeId',
    ];
    public function images(){
        return $this->hasMany(ExperienceImage::class,'experienceId');
    }
    public function category(){
        return $this->belongsTo(ExperienceCategory::class,'categoryId');
    }
    public function gpsMap(){
        return $this->hasOne(ExperienceGpsMap::class,'experienceId');
    }
    public function interactiveMap(){
        return $this->hasOne(ExperienceInteractiveMap::class,'experienceId');
    }
    public function itinerary(){
        return $this->hasOne(ExperienceItinerary::class,'experienceId');
    }
    public function videos(){
        return $this->hasMany(ExperienceVideo::class,'experienceId');
    }

}
