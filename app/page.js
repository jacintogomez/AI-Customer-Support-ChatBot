'use client';
import {Box, Button, Stack, TextField} from '@mui/material';
import {useState} from 'react';
import ReactMarkdown from 'react-markdown';

export default function Home() {
  const [messages,setmessages]=useState([{
    role: 'assistant',
    content: `Hi, I'm the HeadStarter Support Agent. How can I help you today?`,
  }]);

  const [message,setmessage]=useState('');

  const sendmessage=async ()=>{
    setmessage('');
    setmessages((messages)=>[
        ...messages,
        {role:'user',content:message},
        {role:'assistant',content:''},
    ]);
    const response=fetch('/api/chat',{
      method:'POST',
      headers: {
        'Content-Type':'application/json',
      },
      body: JSON.stringify([...messages,{role:'user',content:message}]),
    }).then(async (res)=>{
      const reader=res.body.getReader();
      const decoder=new TextDecoder();
      let result='';
      return reader.read().then(function processText({done,value}){
        if(done){return result;}
        const text=decoder.decode(value||new Int8Array(),{stream:true});
        setmessages((messages)=>{
          let lastmsg=messages[messages.length-1];
          let othermsgs=messages.slice(0,messages.length-1);
          return[
            ...othermsgs,
            {
              ...lastmsg,
              content: lastmsg.content+text,
            },
          ]
        });
        return reader.read().then(processText);
      });
    });
  }

  return <Box width='100vw' height='100vh' display='flex' flexDirection='column' justifyContent='center' alignItems='center' bgcolor='gray'>
    <Stack direction='column' width='600px' height='700px' border='1px solid black' borderRadius='20px' p={2} spacing={2} bgcolor='black' overflow='scroll'>
      <Stack direction='column' spacing={2} flexGrow={1} overflow='auto' maxHeight='100%'>
        {messages.map((msg,index)=>(
            <Box key={index} display='flex' justifyContent={msg.role==='assistant'?'flex-start':'flex-end'}>
              <Box bgcolor={msg.role==='assistant'?'primary.main':'secondary.main'} color='white' borderRadius={16} p={3}>
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </Box>
            </Box>
        ))}
      </Stack>
      <Stack direction='row' spacing={2}>
        <TextField label='message' fullWidth border='1px solid white' value={message} onChange={(e)=>setmessage(e.target.value)}
                   InputProps={{style:{color:'white',},}}
                   InputLabelProps={{style:{color:'white',}}}
                   sx={{
                       '& .MuiOutlinedInput-root': {
                         '& fieldset': {
                           borderColor: 'white', // White border color when inactive
                         },
                         '&:hover fieldset': {
                           borderColor: 'white', // White border on hover
                         },
                         '&.Mui-focused fieldset': {
                           borderColor: 'white', // White border on focus
                         },
                       }
                  }}
        >
        </TextField>
        <Button variant='contained' onClick={sendmessage}>Send</Button>
      </Stack>
    </Stack>
  </Box>
}
