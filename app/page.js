'use client';
import {Box,Stack} from '@mui/material';
import {useState} from 'react';

export default function Home() {
  const [messages,setmessages]=useState([{
    role: 'assistant',
    content: `Hi, I'm the HeadStarter Support Agent. How can I help you today?`,
  }]);
  const [message,setmessage]=useState('');

  return <Box width='100vw' height='100bh' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
    <Stack direction='column' width='600px' height='700px' border='1px solid black' p={2} spacing={2}>
      <Stack direction='column' spacing={2} flexGrow={1} overflow='auto' maxHeight='100%'>
        {messages.map((msg,index)=>(
            <Box key={index} display='flex' justifyContent={msg.role==='assistant'?'flex-start':'flex-end'}>
              <Box bgcolor={msg.role==='assistant'?'primary.main':'secondary.main'} color='white' borderRadius={16} p={3}>
                {msg.content}
              </Box>
            </Box>
        ))}
      </Stack>
    </Stack>
  </Box>
}
