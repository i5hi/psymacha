alias edenv='nano "$HOME"/.bashrc'
alias senv='source "$HOME"/.bashrc'
alias onyxip="docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' onyx"
alias charmip="docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' charmander"
alias clamip="docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' cloyster"
alias eonix="docker exec -it onix bash"
alias emoltres="docker exec -it moltres bash"
alias echarm="docker exec -it charmander bash"
