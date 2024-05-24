<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('avatarJob')->nullable()->default('defaultpp');
            $table->string('userJob')->nullable()->default('my job');
            $table->string('tagsJob')->nullable();
            $table->string('descriptionJob')->nullable()->default('my description');
            $table->string('jobGallery')->nullable();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('avatarJob');
            $table->dropColumn('userJob');
            $table->dropColumn('descriptionJob');
            $table->dropColumn('tagsJob');
            $table->dropColumn('jobGallery');
        });
    }
};
