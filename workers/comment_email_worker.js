const queue = require('../config/kue');

const commentsMailer = require('../mailers/comments_mailer');

queue.process('emails',function(job,done)
{
    console.log('Email worker is processing the job');
    commentsMailer.newComment(job.data);

    done();
})