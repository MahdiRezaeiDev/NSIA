<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class SimpleMail extends Mailable
{
 
    public $receiver,$subject,$message,$template,$attachmentContent,$fileName,$mime;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($to,$subject,$message,$attachmentContent=null,$fileName='attachment.csv',$mime=null)
    {
        if(is_null($mime) ){
            $this->mime = [
                'mime'=>'text/csv'
            ];
        }else{
            $this->mime = $mime;
        }
        $this->fileName = $fileName;
        $this->receiver= $to;
        $this->subject= $subject;

        $this->message= $message;
        $this->attachmentContent=$attachmentContent;
        
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
          $mail= $this->to($this->receiver)
                    ->subject($this->subject)
                    ->markdown('emails.simple');
        if($this->attachmentContent!=null){
            $mail->attachData($this->attachmentContent,$this->fileName,$this->mime);
        }
        return $mail;
    }
}
