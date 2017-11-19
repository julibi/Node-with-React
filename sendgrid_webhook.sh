function localtunnel {
  lt -s vt29874czjdksa1111 --port 5000
}
until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done