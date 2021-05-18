import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from "@material-ui/core/Button"
import TextField from '@material-ui/core/TextField';
import TelegramIcon from '@material-ui/icons/Telegram';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
const QRCode = require('qrcode.react');


function check(room) {
  // room = 'H308-1-1'
  room = room.toUpperCase()
  let result = room.search(/[AFGEKTHBCDL][0-9]{3,4}-[0-9]{1,2}-[0-9]{1,2}$/)
  // console.log('room', room, 'result', result)
  if (result !== -1 && result <= room.length)
    return true
  return false
}


export default function Main(props) {
  let base = 'http://sso.hitsz.edu.cn/auth/a/sign?code='
  let [words, setWords] = React.useState('');

  let url = base + words

  return (
    <div className="root-main" >
      <AppBar>
        <Toolbar id="back-to-top-anchor">
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            HITSZ座位二维码生成
            </Typography>
        </Toolbar>
      </AppBar>

      {/* 一个AppBar高度 */}
      <div style={{ marginTop: 64 + 'px' }}></div>

      <br />

      <div className="container-main">
        <Container className="thread">
          <TextField id="search-box" label="输入座位号，如 H308-7-1" value={words} onChange={(event) => {
            setWords(event.target.value)
          }} fullWidth type="search" variant="outlined" />
          <br /><br />
          <Button
            variant="contained"
            size="large"
            color="primary"
            disabled={!check(words)}
            style={{ borderRadius: 90, width: '100%' }}
            onClick={() => {
              console.log("GO:", url)
              console.log('check:', check(words))
              window.open(url, '_blank')
            }}
          >
            <TelegramIcon style={{ height: 60, width: 60 }} />
            <h2>点击签到</h2>
          </Button>
          <br /><br />
          <Typography variant="body1">
            ↓或者截图保存这个二维码到微信扫描登录↓
          </Typography>
          <br /><br />
          {check(words) ? <div>
            <QRCode value={url} size={360} />
            <br /><br />
            <TextField id="search-box" label="截图可以在此备注是哪科" fullWidth variant="outlined" />
            <br />
            <br />
          </div> : <IconButton><RemoveCircleIcon style={{ width: 360, height: 360 }} /></IconButton>}
          <Typography variant="h4">
            使用问题
          </Typography>
          <br />
          <Typography variant="h6">
            怎么用？
          </Typography>
          <br />
          <Typography variant="body1">
            先连接校内网，然后点击签到或者截图保存二维码到微信签到。如果微信已经绑定了统一认证系统则不需要再次输入信息。
          </Typography>
          <br /><br />
          <Typography variant="h6">
            用了会怎样？
          </Typography>
          <br />
          <Typography variant="body1">
            不会怎样，反正原来的座位号就是明文储存的。不过可能会有后来的人也扫了那个码而取代你的位置。
          </Typography>
        </Container>
      </div>
    </div>
  )
}