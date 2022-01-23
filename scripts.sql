CREATE TABLE `group` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `image` varchar(255) NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `ownerId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;

CREATE TABLE `project` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `image` varchar(255) NOT NULL DEFAULT '', `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `ownerId` int NULL, UNIQUE INDEX `IDX_dedfea394088ed136ddadeee89` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB;

CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `image` varchar(255) NULL, `displayname` varchar(16) NOT NULL, `username` varchar(16) NOT NULL, `email` varchar(255) NOT NULL, `description` text NULL, `password` varchar(128) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_78a916df40e02a9deb1c4b75ed` (`username`), PRIMARY KEY (`id`)) ENGINE=InnoDB;

CREATE TABLE `group_members_user` (`groupId` int NOT NULL, `userId` int NOT NULL, INDEX `IDX_bfa303089d367a2e3c02b002b8` (`groupId`), INDEX `IDX_427107c650638bcb2f1e167d2e` (`userId`), PRIMARY KEY (`groupId`, `userId`)) ENGINE=InnoDB;

CREATE TABLE `project_members_user` (`projectId` int NOT NULL, `userId` int NOT NULL, INDEX `IDX_c79bdce48cf47ff04f1ec3a8ca` (`projectId`), INDEX `IDX_66c5703c0321bafc7c9352098b` (`userId`), PRIMARY KEY (`projectId`, `userId`)) ENGINE=InnoDB;

ALTER TABLE `group` ADD CONSTRAINT `FK_af997e6623c9a0e27c241126988` FOREIGN KEY (`ownerId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `project` ADD CONSTRAINT `FK_9884b2ee80eb70b7db4f12e8aed` FOREIGN KEY (`ownerId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `group_members_user` ADD CONSTRAINT `FK_bfa303089d367a2e3c02b002b8f` FOREIGN KEY (`groupId`) REFERENCES `group`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `group_members_user` ADD CONSTRAINT `FK_427107c650638bcb2f1e167d2e5` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `project_members_user` ADD CONSTRAINT `FK_c79bdce48cf47ff04f1ec3a8ca5` FOREIGN KEY (`projectId`) REFERENCES `project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `project_members_user` ADD CONSTRAINT `FK_66c5703c0321bafc7c9352098b5` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;