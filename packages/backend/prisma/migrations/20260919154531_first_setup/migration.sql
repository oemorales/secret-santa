-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "profile_picture_url" TEXT,
    "area" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gift_exchanges" (
    "id" TEXT NOT NULL,
    "organizer_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "event_date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gift_exchanges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gift_exchange_participants" (
    "id" TEXT NOT NULL,
    "gift_exchange_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gift_exchange_participants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "draw_rules" (
    "id" TEXT NOT NULL,
    "gift_exchange_id" TEXT NOT NULL,
    "allow_multiple_groups" BOOLEAN NOT NULL DEFAULT false,
    "exclude_same_area" BOOLEAN NOT NULL DEFAULT false,
    "exclude_same_subgroup" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "draw_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "draw_exclusions" (
    "id" TEXT NOT NULL,
    "draw_rule_id" TEXT NOT NULL,
    "excluded_user_id_1" TEXT,
    "excluded_user_id_2" TEXT,
    "excluded_subgroup_1" TEXT,
    "excluded_subgroup_2" TEXT,
    "description" TEXT,

    CONSTRAINT "draw_exclusions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "draw_results" (
    "id" TEXT NOT NULL,
    "gift_exchange_id" TEXT NOT NULL,
    "sender_id" TEXT NOT NULL,
    "receiver_id" TEXT NOT NULL,
    "drawn_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "visible_after" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "draw_results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wishlist_items" (
    "id" TEXT NOT NULL,
    "gift_exchange_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "item_name" TEXT NOT NULL,
    "description" TEXT,
    "priority" INTEGER,
    "link" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wishlist_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "gift_exchange_participants_gift_exchange_id_user_id_key" ON "gift_exchange_participants"("gift_exchange_id", "user_id");

-- AddForeignKey
ALTER TABLE "gift_exchanges" ADD CONSTRAINT "gift_exchanges_organizer_id_fkey" FOREIGN KEY ("organizer_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gift_exchange_participants" ADD CONSTRAINT "gift_exchange_participants_gift_exchange_id_fkey" FOREIGN KEY ("gift_exchange_id") REFERENCES "gift_exchanges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gift_exchange_participants" ADD CONSTRAINT "gift_exchange_participants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "draw_rules" ADD CONSTRAINT "draw_rules_gift_exchange_id_fkey" FOREIGN KEY ("gift_exchange_id") REFERENCES "gift_exchanges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "draw_exclusions" ADD CONSTRAINT "draw_exclusions_draw_rule_id_fkey" FOREIGN KEY ("draw_rule_id") REFERENCES "draw_rules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "draw_results" ADD CONSTRAINT "draw_results_gift_exchange_id_fkey" FOREIGN KEY ("gift_exchange_id") REFERENCES "gift_exchanges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "draw_results" ADD CONSTRAINT "draw_results_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "draw_results" ADD CONSTRAINT "draw_results_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlist_items" ADD CONSTRAINT "wishlist_items_gift_exchange_id_fkey" FOREIGN KEY ("gift_exchange_id") REFERENCES "gift_exchanges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlist_items" ADD CONSTRAINT "wishlist_items_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
