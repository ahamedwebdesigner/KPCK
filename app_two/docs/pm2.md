 npm install pm2 -g
 
pm2 start ./bin/www --watch
pm2 list
  
pm2 stop www 
pm2 restart www
pm2 delete www

 pm2 monit
 
 pm2 start ./bin/www -i 2
 
 pm2 reload all
 
 pm2 logs
 
 pm2 flush
 
 pm2 logs www

 
 
 $ pm2 logs APP-NAME       # Display APP-NAME logs
$ pm2 logs --json         # JSON output
$ pm2 logs --format       # Formated output

$ pm2 flush               # Flush all logs
$ pm2 reloadLogs          # Reload all logs



pm2 install <module_name>

pm2 install pm2-server-monit

pm2 set pm2-server-monit:drive /

