<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('swipes', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained()->onDelete('cascade');
        $table->foreignId('job_id')->constrained()->onDelete('cascade');
        $table->enum('direction', ['left', 'right']);
        $table->timestamps();
    });
}

public function down()
{
    Schema::dropIfExists('swipes');
}
};
