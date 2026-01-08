FROM git.rox.vn/splus/node:22-alpine as builder

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn 
COPY . .
RUN  yarn build

FROM git.rox.vn/splus/node:22-alpine

COPY --from=builder /usr/src/app/dist /usr/src/app/dist
COPY --from=builder /usr/src/app/node_modules /usr/src/app/node_modules
COPY --from=builder /usr/src/app/package.json /usr/src/app/package.json

EXPOSE 9999
WORKDIR /usr/src/app

ENTRYPOINT ["node", "dist/main"]
