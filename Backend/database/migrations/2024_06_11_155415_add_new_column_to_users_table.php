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
            $table->string('avatarEvent')->nullable()->default('defaultpp');
            $table->string('tagsEvent')->nullable();
            $table->string('descriptionEvent')->nullable()->default('my description');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('avatarEvent');
            $table->dropColumn('descriptionEvent');
            $table->dropColumn('tagsEvent');
        });
    }
};
