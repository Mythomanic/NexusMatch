<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobFilter extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'filter_name',
        'filter_value',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
