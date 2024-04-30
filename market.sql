/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 100432 (10.4.32-MariaDB)
 Source Host           : localhost:3306
 Source Schema         : market

 Target Server Type    : MySQL
 Target Server Version : 100432 (10.4.32-MariaDB)
 File Encoding         : 65001

 Date: 03/04/2024 01:47:21
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tradinginfos
-- ----------------------------
DROP TABLE IF EXISTS `tradinginfos`;
CREATE TABLE `tradinginfos`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `buyAmount` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sellAmount` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `frequency` int NULL DEFAULT NULL,
  `slippage` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `walletId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `status` tinyint(1) NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 35 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tradinginfos
-- ----------------------------
INSERT INTO `tradinginfos` VALUES (1, '0x4C674b318b27c4061Fc94660922f504a4db6AE79', '0.0001', '0.0001', 30, '5', '1', 0, '2024-04-02 16:07:31', '2024-04-02 16:12:21');
INSERT INTO `tradinginfos` VALUES (2, '0x4C674b318b27c4061Fc94660922f504a4db6AE79', '0.0001', '0.0001', 30, '5', '1', 0, '2024-04-02 16:14:58', '2024-04-02 16:19:42');
INSERT INTO `tradinginfos` VALUES (3, '0x4C674b318b27c4061Fc94660922f504a4db6AE79', '0.0001', '0.0001', 30, '5', '1', 0, '2024-04-02 16:42:18', '2024-04-02 16:43:59');
INSERT INTO `tradinginfos` VALUES (4, '0x4C674b318b27c4061Fc94660922f504a4db6AE79', '0.0001', '0.0001', 30, '5', '1', 0, '2024-04-02 17:03:58', '2024-04-02 17:05:38');
INSERT INTO `tradinginfos` VALUES (5, '0x4C674b318b27c4061Fc94660922f504a4db6AE79', '0.0001', '0.0001', 30, '5', '1', 0, '2024-04-02 17:23:42', '2024-04-02 17:24:59');
INSERT INTO `tradinginfos` VALUES (6, '0x4C674b318b27c4061Fc94660922f504a4db6AE79', '0.0001', '0.0001', 30, '5', '1', 0, '2024-04-02 18:44:45', '2024-04-02 18:45:34');
INSERT INTO `tradinginfos` VALUES (7, '0x4C674b318b27c4061Fc94660922f504a4db6AE79', '0.0001', '0.0001', 30, '5', '1', 0, '2024-04-02 18:47:26', '2024-04-02 18:48:01');
INSERT INTO `tradinginfos` VALUES (8, '0x4C674b318b27c4061Fc94660922f504a4db6AE79', '0.0001', '0.0001', 30, '5', '1', 0, '2024-04-02 18:52:00', '2024-04-02 18:52:22');
INSERT INTO `tradinginfos` VALUES (9, '0x4C674b318b27c4061Fc94660922f504a4db6AE79', '0.0001', '0.0001', 30, '5', '1', 0, '2024-04-02 18:57:09', '2024-04-02 18:57:48');
INSERT INTO `tradinginfos` VALUES (10, '0x4C674b318b27c4061Fc94660922f504a4db6AE79', '0.0001', '0.0001', 30, '5', '1', 0, '2024-04-02 19:00:51', '2024-04-02 19:01:29');
INSERT INTO `tradinginfos` VALUES (11, '0x4C674b318b27c4061Fc94660922f504a4db6AE79', '0.0001', '0.0001', 30, '5', '1', 0, '2024-04-02 19:02:08', '2024-04-02 19:02:41');
INSERT INTO `tradinginfos` VALUES (12, '0x4C674b318b27c4061Fc94660922f504a4db6AE79', '0.0001', '0.0001', 30, '5', '1', 0, '2024-04-02 19:10:09', '2024-04-02 19:10:42');
INSERT INTO `tradinginfos` VALUES (13, '0x4C674b318b27c4061Fc94660922f504a4db6AE79', '0.0001', '0.0001', 30, '5', '1', 0, '2024-04-02 22:22:35', '2024-04-02 22:22:54');
INSERT INTO `tradinginfos` VALUES (14, '0x4C674b318b27c4061Fc94660922f504a4db6AE79', '0.0001', '0.0001', 30, '5', '1', 0, '2024-04-02 22:24:45', '2024-04-02 22:25:22');
INSERT INTO `tradinginfos` VALUES (15, '0x4C674b318b27c4061Fc94660922f504a4db6AE79', '0.0001', '0.0001', 30, '5', '1', 0, '2024-04-02 22:29:56', '2024-04-02 22:30:24');
INSERT INTO `tradinginfos` VALUES (16, '0x4C674b318b27c4061Fc94660922f504a4db6AE79', '0.0001', '0.0001', 30, '5', '1', 0, '2024-04-02 22:32:32', '2024-04-02 22:33:04');
INSERT INTO `tradinginfos` VALUES (17, '0x4C674b318b27c4061Fc94660922f504a4db6AE79', '0.0001', '0.0001', 30, '5', '1', 0, '2024-04-02 22:36:02', '2024-04-02 22:36:22');
INSERT INTO `tradinginfos` VALUES (18, '0x4C674b318b27c4061Fc94660922f504a4db6AE79', '0.0001', '0.0001', 30, '5', '1', 0, '2024-04-02 22:46:41', '2024-04-02 22:47:09');
INSERT INTO `tradinginfos` VALUES (19, '0x4C674b318b27c4061Fc94660922f504a4db6AE79', '0.0001', '0.0001', 30, '5', '1', 0, '2024-04-02 22:47:59', '2024-04-02 22:48:44');
INSERT INTO `tradinginfos` VALUES (20, '0x4C674b318b27c4061Fc94660922f504a4db6AE79', '0.0001', '0.0001', 30, '5', '1', 0, '2024-04-02 22:54:30', '2024-04-02 22:54:33');
INSERT INTO `tradinginfos` VALUES (21, '0x4C674b318b27c4061Fc94660922f504a4db6AE79', '0.0001', '0.0001', 30, '5', '1', 0, '2024-04-02 22:56:32', '2024-04-02 22:56:47');
INSERT INTO `tradinginfos` VALUES (22, '0x4C674b318b27c4061Fc94660922f504a4db6AE79', '0.0001', '0.0001', 30, '5', '1', 0, '2024-04-02 22:57:16', '2024-04-02 22:57:39');
INSERT INTO `tradinginfos` VALUES (23, '0x4C674b318b27c4061Fc94660922f504a4db6AE79', '0.0001', '0.0001', 30, '5', '1', 0, '2024-04-02 22:59:56', '2024-04-02 23:00:22');
INSERT INTO `tradinginfos` VALUES (24, '0x4C674b318b27c4061Fc94660922f504a4db6AE79', '0.0001', '0.0001', 30, '5', '1', 0, '2024-04-02 23:01:00', '2024-04-02 23:01:28');
INSERT INTO `tradinginfos` VALUES (25, '0x4C674b318b27c4061Fc94660922f504a4db6AE79', '0.0001', '0.0001', 30, '5', '1', 0, '2024-04-02 23:02:24', '2024-04-02 23:10:01');
INSERT INTO `tradinginfos` VALUES (26, '0x4C674b318b27c4061Fc94660922f504a4db6AE79', '0.0001', '0.0001', 30, '5', '1', 0, '2024-04-02 23:10:04', '2024-04-02 23:11:17');
INSERT INTO `tradinginfos` VALUES (27, '0x4C674b318b27c4061Fc94660922f504a4db6AE79', '0.0001', '0.0001', 30, '5', '1', 0, '2024-04-02 23:11:35', '2024-04-02 23:11:35');
INSERT INTO `tradinginfos` VALUES (28, '0x4C674b318b27c4061Fc94660922f504a4db6AE79', '0.0001', '0.0001', 30, '5', '1', 0, '2024-04-02 23:17:06', '2024-04-02 23:18:00');
INSERT INTO `tradinginfos` VALUES (29, '0x4C674b318b27c4061Fc94660922f504a4db6AE79', '0.0001', '0.0001', 30, '5', '1', 0, '2024-04-02 23:19:40', '2024-04-02 23:20:35');
INSERT INTO `tradinginfos` VALUES (30, '0x4C674b318b27c4061Fc94660922f504a4db6AE79', '0.0001', '0.0001', 20, '5', '1', 0, '2024-04-02 23:24:54', '2024-04-02 23:25:41');
INSERT INTO `tradinginfos` VALUES (31, '0x4C674b318b27c4061Fc94660922f504a4db6AE79', '0.0001', '0.0001', 20, '5', '1', 0, '2024-04-02 23:28:03', '2024-04-02 23:28:41');
INSERT INTO `tradinginfos` VALUES (32, '0x4C674b318b27c4061Fc94660922f504a4db6AE79', '0.0001', '0.0001', 20, '5', '1', 0, '2024-04-02 23:30:32', '2024-04-02 23:31:05');
INSERT INTO `tradinginfos` VALUES (33, '0x4C674b318b27c4061Fc94660922f504a4db6AE79', '0.0001', '0.0001', 20, '5', '1', 0, '2024-04-02 23:34:07', '2024-04-02 23:34:53');
INSERT INTO `tradinginfos` VALUES (34, '0x4C674b318b27c4061Fc94660922f504a4db6AE79', '0.0001', '0.0001', 20, '5', '1', 0, '2024-04-02 23:39:34', '2024-04-02 23:41:29');

-- ----------------------------
-- Table structure for tradinglogs
-- ----------------------------
DROP TABLE IF EXISTS `tradinglogs`;
CREATE TABLE `tradinglogs`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `logContent` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tradinglogs
-- ----------------------------

-- ----------------------------
-- Table structure for transactions
-- ----------------------------
DROP TABLE IF EXISTS `transactions`;
CREATE TABLE `transactions`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `hash` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `eth` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `token` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `action` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `status` tinyint(1) NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of transactions
-- ----------------------------
INSERT INTO `transactions` VALUES (14, '0x849710adfa6185aeebb712473d9c17d6dac805068029b22f8627b8bd534bc3cd', '0.0001', '101.20553831', '0x4C674b318b27c4061Fc94660922f504a4db6AE79', 'BUY', 1, '2024-04-02 23:40:00', '2024-04-02 23:40:00');
INSERT INTO `transactions` VALUES (15, '0x95eeac44321ea5897a4bd727342f910b6044cc4a742f3944a1181c1d6fe20a5a', '0.0001', '101.20545327', '0x4C674b318b27c4061Fc94660922f504a4db6AE79', 'BUY', 1, '2024-04-02 23:40:32', '2024-04-02 23:40:32');
INSERT INTO `transactions` VALUES (16, '0x371ed6d21c0777e63c8832c1207ba5dd62d6f92f16be739bdd5ce04c3581ad55', '0.0001', '101.950063287', '0x4C674b318b27c4061Fc94660922f504a4db6AE79', 'SELL', 1, '2024-04-02 23:41:43', '2024-04-02 23:41:43');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `status` tinyint(1) NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'Admin', '$2b$10$69Jl0zt.vMQu.9utaFON6eEuiN9EIhgecCfnSsUxQyHJZNuvfkEWq', 1, '2024-04-02 12:10:57', '2024-04-02 12:10:57');

-- ----------------------------
-- Table structure for wallets
-- ----------------------------
DROP TABLE IF EXISTS `wallets`;
CREATE TABLE `wallets`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `privateKey` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `balance` int NULL DEFAULT NULL,
  `active` int NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of wallets
-- ----------------------------
INSERT INTO `wallets` VALUES (1, '\"0x55BB7D688E373A68B7B65BE7592a06f9993fbd2f\"', '\"0x4080765f70fe30760cb7230684085bbf99c8ec41ea7c42a1547973e5ee0c829c\"', 0, 1, '2024-04-02 15:38:09', '2024-04-02 23:39:34');

SET FOREIGN_KEY_CHECKS = 1;
