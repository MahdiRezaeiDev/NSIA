<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Individualform;
class SendApplicationDetailsToIVP implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected $references=[];

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($references)
    {
        $this->references   =$references;
        \App\IvpQueue::where('family_form_reference_no',$this->references)->update(['in_queue'=>true]);
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        \App\IvpQueue::sendRecordsByReferences($this->references);
    }
}
