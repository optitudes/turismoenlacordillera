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
}
