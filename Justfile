OWNER := "suvoi"
REPO  := "tarmo-web"

IMAGE := "ghcr.io/{{OWNER}}/{{REPO}}"

lint:
    yarn lint

format:
    yarn format

git-tag version:
    git tag v{{version}}
    git push
    git push --tags

gh-release version:
    gh release create v{{version}} --generate-notes

docker-build version:
    docker build -t {{IMAGE}}:v{{version}} -t {{IMAGE}}:latest .

docker-push version:
    docker push {{IMAGE}}:v{{version}}
    docker push {{IMAGE}}:latest

release version:
    just lint
    just format
    just git-tag {{version}}
    just gh-release {{version}}
    just docker-build {{version}}
    just docker-push {{version}}
    echo "🎉 Release v{{version}} succesfully deployed"
